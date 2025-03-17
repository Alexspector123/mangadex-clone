import React from 'react'
import { FiHome } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";

export const SideBarData = [
    {
        path: "/",
        name: "Home",
        icon: <FiHome />,
        type: "link"
    },
    {
        path: "/",
        name: "Follows",
        icon: <FaRegBookmark />,
        type: "title"
    },
    {
        path: "/titles/feed",
        name: "Updates",
        type: "link"
    },
    {
        path: "/titles/follows",
        name: "Library",
        type: "link"
    },
    {
        path: "/my/lists",
        name: "MDLists",
        type: "link"
    },
    {
        path: "/my/groups",
        name: "My Groups",
        type: "link"
    },
    {
        path: "/my/history",
        name: "Reading History",
        type: "link"
    },
    {
        path: "/",
        name: "Titles",
        icon: <FaRegBookmark />,
        type: "title"
    },
    {
        path: "/titles",
        name: "Advanced Search",
        type: "link"
    },
    {
        path: "/titles/recent",
        name: "Recently Added",
        type: "link"
    },
    {
        path: "/titles/lastest",
        name: "Lastest Updates",
        type: "link"
    },
    {
        path: "/titles/random",
        name: "Random",
        type: "link"
    }
];