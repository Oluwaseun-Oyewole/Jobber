import ProfileImage from "@/assets/Avatar.svg";
import Image from "next/image";
import Link from "next/link";

const ProfileViewers = () => {
  const profiles = new Array(8).fill("_");
  return (
    <div className="bg-white overflow-y-scroll h-[40vh] mb-5 lg:mb-20 rounded-md">
      <div className="px-6">
        <div className="flex justify-between items-center sticky top-0 left-0 py-6 bg-white">
          <p className="font-[300]">Profile Viewer</p>
          <p className="text-deepBlue">All Profile Views</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center">
          {profiles?.map((_, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-6 font-[300] pb-10"
              >
                <Image
                  src={ProfileImage}
                  alt="jop port logo"
                  className="rounded-full w-[70px]"
                />
                <div className="flex gap-1 flex-col">
                  <p>Samuel Tarly</p>
                  <p className="text-gray-600 text-sm">
                    HR Manager, Interswitch
                  </p>
                  <Link
                    href={`/dashboard/profile-views/samuel-tarly`}
                    className="text-deepBlue font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileViewers;
