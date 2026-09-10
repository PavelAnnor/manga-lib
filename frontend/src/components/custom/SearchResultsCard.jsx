export default function SearchResultsCard({imgSrc,title,author,year}){


    return (
      <div className="col-span-1 flex flex-col justify-center gap-2 text-[var(--primary-text)]">
        <img
          className="w-full bg-[#1c1c1c] rounded-xl aspect-[6/10]"
          src={imgSrc}
        />

        <p className="line-clamp-2 h-10 text-sm font-medium">{title}</p>

        <div className="flex gap-1 h-5 text-sm text-[var(--secondary-text)]">
          <p className="truncate">{author},</p>
          <p className="shrink-0">{year}</p>
        </div>
      </div>
    );
}