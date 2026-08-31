export default function FeaturesCard({imgSrc,label,desc}) {


    return (
      <article className="p-4 border rounded-lg shadow-md col-span-2 lg:col-span-1 flex flex-col gap-2 bg-[var(--card-background)] border-[var(--card-border)] ">
        
          <img src={imgSrc} className="w-10 md:w-14 "/>
       
        <p className=" text-[var(--primary-text)] text-base"> {label}</p>
        <p className=" text-[var(--primary-text)] text-sm">{desc}</p>
      </article>
    );
}