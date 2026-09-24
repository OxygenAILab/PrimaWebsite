"""从品牌素材原图生成网页用图（一次性脚本，产物提交进 assets/images）。

源图：官网设计案/设计与交互参考/首页素材原图/（深绿针叶林航拍，画面中央叠有一枚
      Oxygen 环形 logo；原图底部还有一行内部模型计划文字，裁切时必须切掉）

产出：art-band.jpg（模型区宽幅）、art-detail.jpg（能力区配图）

调色目标：这张照片本身是浓绿高饱和的，直接放上浅色页面会形成一块"深色硬块"。
处理分三步，把它压成能和 --bg #f7f7f5 共存的克制版：
1. 饱和度降到 ×1.15、对比 ×1.12（不做夸张增强）；
2. 叠一层从白到品牌浅青（--brand-soft #d9ebe7）的垂直渐变（正片叠底），带上品牌色相；
3. 再压 16% 的页面底色白纱，把暗部整体提起来。
"""
from PIL import Image, ImageEnhance, ImageChops
import glob
import os

SRC_DIR = r"D:\AI\Prima\官网设计案\设计与交互参考\首页素材原图"
OUT_DIR = r"D:\AI\Prima-Website-Prima\assets\images"
BRAND_SOFT = (217, 235, 231)  # #d9ebe7
PAGE_BG = (247, 247, 245)  # --bg

sources = sorted(glob.glob(os.path.join(SRC_DIR, "*.jpg")))
if not sources:
    raise SystemExit("no source jpg found")
im = Image.open(sources[0]).convert("RGB")
print("source:", os.path.basename(sources[0]), f"{im.size[0]}x{im.size[1]}")


def tint(img: Image.Image, strength: float = 1.0) -> Image.Image:
    """白→品牌浅青的垂直渐变，正片叠底到画面上。"""
    w, h = img.size
    gradient = Image.new("RGB", (1, h))
    for y in range(h):
        t = (y / max(h - 1, 1)) ** 0.9
        gradient.putpixel((0, y), tuple(
            round(255 + (c - 255) * t * strength) for c in BRAND_SOFT
        ))
    return ImageChops.multiply(img, gradient.resize((w, h)))


def calm(img: Image.Image, tint_strength: float, veil: float) -> Image.Image:
    """克制化：降饱和 → 品牌着相 → 提亮暗部。"""
    out = ImageEnhance.Color(img).enhance(1.15)
    out = ImageEnhance.Contrast(out).enhance(1.12)
    out = tint(out, tint_strength)
    return Image.blend(out, Image.new("RGB", out.size, PAGE_BG), veil)


def save(img: Image.Image, name: str, max_w: int, quality: int) -> None:
    copy = img.copy()
    copy.thumbnail((max_w, max_w * 3))
    path = os.path.join(OUT_DIR, name)
    copy.save(path, quality=quality, optimize=True, progressive=True)
    print(f"  {name}: {copy.size[0]}x{copy.size[1]}  {os.path.getsize(path) // 1024}KB")


os.makedirs(OUT_DIR, exist_ok=True)

# 能力区配图：竖构图偏方，取自中部，层次强一些
detail = im.crop((int(im.width * 0.30), 0, im.width, int(im.height * 0.88)))
save(calm(detail, 0.95, 0.16), "art-detail.jpg", 900, 76)

# 模型区宽幅：横切一条，避开底部内部文字行
band = im.crop((0, int(im.height * 0.16), im.width, int(im.height * 0.84)))
save(calm(band, 0.85, 0.16), "art-band.jpg", 1400, 72)