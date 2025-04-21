import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const TabNavigation = () => {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "chapters";

    const tabList = ["chapters", "art", "related"];
    
    return (
        <div className="flex  gap-4 bg-slate-200 inline-block p-1 rounded-sm">
            {tabList.map((t) => (
            <Link
                key={t}
                to={`?tab=${t}`}
                className={`px-2 py-0.5 font-bold ${tab === t ? "bg-black text-white" : ""} transition-all duration-200`}
            >
                {t.charAt(0).toUpperCase() + t.slice(1)}
            </Link>
            ))}
        </div>
    )
    }

export default TabNavigation