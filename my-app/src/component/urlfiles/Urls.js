function optimizeCloudinaryUrl(url) {
    if (!url.includes("/upload/")) return url; 
    return url.replace("/upload/", "/upload/q_auto,f_auto/,h_480/");
  }
  
  const urls = [
    {
      ad1: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735460290/adEdit1_ip7ucu.mp4"
      ),
      ad2: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735470833/ad2_1_rbq2t2.mp4"
      ),
      ad3: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735469354/ad3_zdkhtp.mp4"
      ),
      simple1: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735469019/sp1_nqjoei.mp4"
      ),
      simple2: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735469032/sp3_xztapx.mp4"
      ),
      simple3: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735469055/sp2_eej222.mp4"
      ),
      motion1: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735976869/ALL_THE_EDITSrf_cymctm.mp4"
      ),
      motion2: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735977983/Comp_1_1_fxehc0.mp4"
      ),
      motion3: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1736136336/The%20Freelancer/motion%203.mp4"
      ),
      pd1: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766070412/prime_roll_eehsdu.mp4"
      ),
      pd2: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766065363/V-2_gm2i2s.mp4"
      ),
      pd3: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766065365/final_flag_ni9crx.mp4"
      ),
      pd4: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766065359/Why_Rakesh_Jhunjhunwala_was_the_GOATxashish_hhpgn4.mp4"
      ),
      pd5: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766065365/oahu_vid1_gqjmp0.mp4"
      ),
      pd6: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766068773/script_2_xo0aub.mp4"
      ),
      pd7: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1766065323/WhatsApp_Video_2025-12-11_at_10.38.34_PM_irlr9m.mp4"
      ),
      // pd8: optimizeCloudinaryUrl(
      //   "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1736136336/The%20Freelancer/motion%203.mp4"
      // ),

    },
  ];
  
  export default urls;