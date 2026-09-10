export default function SkeletonSearchResultsCard(){


    return (
      <div className=" col-span-1 flex flex-col  justify-center gap-2">
        <div className="w-[100%] bg-[#1c1c1c] h-[70%] rounded-xl aspect-[6/10] animate-pulse"> 
        </div>
        <div className="w-[30%] bg-[#131313] h-[7%] rounded-[5px] animate-pulse"></div>
        <div className="w-[50%] bg-[#3b3b3b] h-[5%] rounded-[5px] animate-pulse"></div>
      </div>
    );



}