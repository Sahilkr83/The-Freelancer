

function Youtube ({link}){
    return(
       <div className="flex w-full justify-center my-[22px]">
        <iframe  width="210px" height="390px" 
         src={link}
          title="YouTube video player" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       </div>
    )
}
export default Youtube;