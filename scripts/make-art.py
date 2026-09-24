"""从品牌素材原图生成网页用图（一次性脚本，产物提交进 assets/images）。

源图：官网设计案/设计与交互参考/首页素材原图/（青白玻璃折射，无文字）
产出：art-band.jpg（模型区宽幅）、art-detail.jpg（能力区配图）

源图本身极淡（近白浅青），直接上网会像空白块。这里做两步处理：
1. 增强饱和度与对比度，把折射结构提出来；
2. 叠一层从白到品牌浅青（--brand-soft #d9ebe7）的垂直渐变（正片叠底），
   让画面带上品牌色相、上下有层次，落在浅底页面上能立住。
"""
from PIL import Image, ImageEnhance, ImageChops
import glob
import os

SRC_DIR = r"D:\AI\Prima\官网设计案\设计与交互参考\首页素材原图"
OUT_DIR = r"D:\AI\Prima-Website-Prima\assets\images"
BRAND_SOFT = (217, 235, 231)  # #d9ebe7

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


def save(img: Image.Image, name: str, max_w: int, quality: int) -> None:
    copy = img.copy()
    copy.thumbnail((max_w, max_w * 3))
    path = os.path.join(OUT_DIR, name)
    copy.save(path, quality=quality, optimize=True, progressive=True)
    print(f"  {name}: {copy.size[0]}x{copy.size[1]}  {os.path.getsize(path) // 1024}KB")


os.makedirs(OUT_DIR, exist_ok=True)
base = ImageEnhance.Color(im).enhance(1.7)
base = ImageEnhance.Contrast(base).enhance(1.35)

# 能力区配图：竖构图偏方，取自中部，层次强一些
detail = base.crop((int(im.width * 0.30), 0, im.width, int(im.height * 0.88)))
save(tint(detail, 0.95), "art-detail.jpg", 900, 76)

# 模型区宽幅：横切一条，安静一点
band = base.crop((0, int(im.height * 0.16), im.width, int(im.height * 0.84)))
save(tint(band, 0.75), "art-band.jpg", 1400, 72)
