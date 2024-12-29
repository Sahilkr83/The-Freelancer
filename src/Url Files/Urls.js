function optimizeCloudinaryUrl(url) {
    if (!url.includes("/upload/")) return url; 
    return url.replace("/upload/", "/upload/q_auto,f_auto/");
  }
  
  const urls = [
    {
      backgroundVideoUrl: optimizeCloudinaryUrl(
        "https://res.cloudinary.com/dxp7dcmvr/video/upload/v1735458285/background_video_dbrrbr.mp4"
      ),
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

    },
  ];
  
  export default urls;