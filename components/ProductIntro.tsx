export function ProductIntro() {
  return (
    <section className="relative flex w-full flex-col justify-center overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-950 sm:text-[48px] md:text-[58px]">
            An AI workspace that transforms ideas into{" "}
            <span className="font-editorial font-normal text-ink-700">personalized systems</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-[1.6] text-ink-600 sm:text-[18px]">
            Turn your ideas into beautiful, functional systems. From professional CRMs to personal
            trackers, build the tools that work exactly the way you do.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[980px] sm:mt-14">
          <div className="relative overflow-hidden rounded-[22px]">
            <video
              src="/info/product_vid.mov"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
