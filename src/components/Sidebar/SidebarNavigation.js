import { MdOutlineExplore } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { RiGroupLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BiHomeCircle } from "react-icons/bi";




export const navigationMenu = [

    {
        title: "Home",
        icon: <BiHomeCircle  size={28} />,
        path: "/",
    },
    {
        title: "Reels",
        icon: <MdOutlineExplore   size={28} />,
        path: "/",
    },
    {
        title: "Create Reels",
        icon: <MdAddCircleOutline   size={26}/>,
        path: "/",
    },
    {
        title: "Notifications",
        icon: <MdOutlineNotificationsNone  size={28} />,
        path: "/",
    },
    {
        title: "Message",
        icon: <BiMessageDetail  size={26} />,
        path: "/",
    },
    {
        title: "Lists",
        icon: <RiFileListLine  size={26} />,
        path: "/",
    },
    {
        title: "Communities",
        icon: <RiGroupLine  size={26} />,
        path: "/",
    },
    {
        title: "Profile",
        icon: <MdOutlineAccountCircle  size={28} />,
        path: "/",
    },

]