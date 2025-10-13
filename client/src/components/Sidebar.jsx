import React from "react";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";


import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { SiTrendmicro } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import SidebarSection from "./SidebarSection";

function Sidebar() {

    const homeItems = [
        {
            id: 1,
            name: "Home",
            icon: <GoHome />,
        },
        {
            id: 2,
            name: "Shorts",
            icon: <SiYoutubeshorts />,
        },
        {
            id: 3,
            name: "Subscriptions",
            icon: <MdOutlineSubscriptions />,
        },
    ];

    const youItems = [
        {
            id: 1,
            name: "Your Channel",
            icon: <PiUserSquareThin />,
            path: "/my-content"
        },
        {
            id: 2,
            name: "History",
            icon: <MdHistory />,
        },
        {
            id: 3,
            name: "Playlists",
            icon: <MdOutlineSubscriptions />,
        },
        {
            id: 4,
            name: "Your Videos",
            icon: <BiVideo />,
        },
        {
            id: 5,
            name: "Watch later",
            icon: <MdOutlineWatchLater />,
        },
        {
            id: 6,
            name: "Liked videos",
            icon: <AiOutlineLike />,
        },
    ];

    const exploreItems = [
        {
            id: 1,
            name: "Trending",
            icon: <SiTrendmicro />,
        },
        {
            id: 2,
            name: "Shopping",
            icon: <HiOutlineShoppingBag />,
        },
        {
            id: 3,
            name: "Music",
            icon: <SiYoutubemusic />,
        },
        {
            id: 4,
            name: "Films",
            icon: <PiFilmSlateLight />,
        },
        {
            id: 5,
            name: "Live",
            icon: <CgMediaLive />,
        },
        {
            id: 6,
            name: "Gaming",
            icon: <IoGameControllerOutline />,
        },
        {
            id: 7,
            name: "News",
            icon: <FaRegNewspaper />,
        },
        {
            id: 8,
            name: "Sport",
            icon: <TfiCup />,
        },
        {
            id: 9,
            name: "Courses",
            icon: <SiStylelint />,
        },
        {
            id: 10,
            name: "Fashion & beauty",
            icon: <PiLightbulbLight />,
        },
        {
            id: 11,
            name: "Padcasts",
            icon: <MdPodcasts />,
        },
    ];
    const moreItems = [
        {
            id: 1,
            name: "Youtube Premium",
            icon: <FaYoutube />,
        },
        {
            id: 2,
            name: "Youtube Studio",
            icon: <SiYoutubestudio />,
        },
        {
            id: 3,
            name: "Youtube Music",
            icon: <SiYoutubemusic />,
        },
        {
            id: 4,
            name: "Youtube Kids",
            icon: <SiYoutubekids />,
        },
    ];

    return (
        <div className="w-[13%] h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden ml-2">

            <SidebarSection items={homeItems} />
            <hr className="my-3" />

            <SidebarSection title="You" items={youItems} showArrow />
            <hr className="my-3" />

            <SidebarSection title="Explore" items={exploreItems} />
            <hr className="my-3" />

            <SidebarSection title="More from VideoTube" items={moreItems} />
            <hr className="my-3" />

            <div className="px-2 text-xs text-gray-600 font-semibold space-y-2">
                <p>
                    About press copyright <br /> Contact us creators <br /> Advertise
                    developers
                </p>
                <p className="mt-3">
                    Privacy Policy, Safety, Terms & Condition
                </p>
                <p className="text-gray-500 mt-3">@ copyright 2025</p>
            </div>
        </div>
    )
}

export default Sidebar
