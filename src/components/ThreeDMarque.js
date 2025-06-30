
import { ThreeDMarquee } from "../ui/3d-marquee";
export function ThreeDMarque() {
  const images = [
    "https://i.pinimg.com/736x/53/0e/f4/530ef4aa8c6a43ac7949cd5ff9e84f27.jpg",
    "https://i.pinimg.com/736x/87/85/c0/8785c030ba603fec4d7de8d3fe3ea5ff.jpg",
    "https://i.pinimg.com/736x/91/f8/d0/91f8d09c48b47ba8bbc049ff664a5b03.jpg",
    "https://i.pinimg.com/736x/40/ad/7f/40ad7fe003fefa4d45daa27d5e95c5a4.jpg",
    "https://i.pinimg.com/736x/82/6f/8d/826f8d2150f1f38344206054752ac22e.jpg",
    "https://i.pinimg.com/736x/67/10/2a/67102a391f282217f874684530bc3b24.jpg",
    "https://i.pinimg.com/736x/e4/6c/bd/e46cbddcebdb1726026ea9ffa4d3535e.jpg",
    "https://i.pinimg.com/736x/53/0e/f4/530ef4aa8c6a43ac7949cd5ff9e84f27.jpg",
    "https://i.pinimg.com/736x/87/85/c0/8785c030ba603fec4d7de8d3fe3ea5ff.jpg",
    "https://i.pinimg.com/736x/91/f8/d0/91f8d09c48b47ba8bbc049ff664a5b03.jpg",
    "https://i.pinimg.com/736x/40/ad/7f/40ad7fe003fefa4d45daa27d5e95c5a4.jpg",
    "https://i.pinimg.com/736x/82/6f/8d/826f8d2150f1f38344206054752ac22e.jpg",
    "https://i.pinimg.com/736x/67/10/2a/67102a391f282217f874684530bc3b24.jpg",
    "https://i.pinimg.com/736x/e4/6c/bd/e46cbddcebdb1726026ea9ffa4d3535e.jpg",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://i.pinimg.com/736x/d6/15/b5/d615b52f6aaddd9afa947e5631fe9294.jpg",
    "https://i.pinimg.com/736x/53/0e/f4/530ef4aa8c6a43ac7949cd5ff9e84f27.jpg",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];
  return (
    <div
      className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
