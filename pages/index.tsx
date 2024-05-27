import { Inter } from "next/font/google";
import { BsTwitter } from 'react-icons/bs';
import { BiHomeCircle, BiHash, BiBell, BiEnvelope, BiBookmark, BiUser, BiMessageSquareAdd } from 'react-icons/bi';
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";

const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: <BiHomeCircle /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notifications", icon: <BiBell /> },
  { title: "Messages", icon: <BiEnvelope /> },
  { title: "Bookmarks", icon: <BiBookmark /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "Tweet", icon: <BiMessageSquareAdd /> },
];

const handleLoginWithGoogle = async (cred: CredentialResponse) => {
  const googleToken = cred.credential;
  if (!googleToken) return toast.error('Google login failed');
  try {
    const data = await graphQLClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
    toast.success("Google login successful");
    console.log(data);
    if (data.verifyGoogleToken){
      window.localStorage.setItem("twitter_token", googleToken);
    }
  } catch (error) {
    toast.error("Google login failed");
    console.error(error);

  }
};

export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-8 px-4">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer">
            <BsTwitter />
          </div>
          <div className="mt-4 text-2xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full p-2 cursor-pointer"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] no-scrollbar border border-gray-600 h-screen overflow-scroll">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="text-xl">New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
