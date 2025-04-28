import React from 'react';

const SearchAuthorItem = ({ data }) => {
    if(!data) return null;
    if (!data.attributes) return null;

    return (
        <div>
                <a
                className=''
                key={data.id}
                href={`#`}>
                    <div className='grid grid-cols-[30px_1fr] gap-2 w-full
                                    min-h-8
                                    items-center
                                    bg-slate-100 hover:bg-slate-300
                                    transition-all duration-200
                                    p-1.5'>
                        <div className='h-full w-full'>
                            <img className='rounded-full shadow-md object-fill' src='https://mangadex.org/img/avatar.png' alt="Cover img" />
                        </div>
                        <div className='font-semibold text-base line-clamp-1'>
                            {data.attributes.name || "No name"}
                        </div>
                    </div>
                </a>
        </div>
    )
}

export default SearchAuthorItem