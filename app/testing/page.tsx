import { getProfiles, login } from "@/app/data/lib";
import { Profile } from "../data/types";
import Image from "next/image";

export default async function TestPage() {
  try {
    const tokenData = await login("lilianwambui@example.com", "StrongPass123!");

    if (!tokenData?.key) {
      return (
        <div className="flex justify-center items-center h-screen">
          Login failed. Please check your credentials.
        </div>
      );
    }

    const profiles: Profile[] = await getProfiles(tokenData.key);

    if (!profiles || profiles.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          No profiles found or failed to fetch profiles.
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-6 p-4">
        <h1 className="text-3xl font-bold mb-6">Fetched Profiles</h1>
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="w-full max-w-2xl p-6 border rounded-lg shadow-md bg-white"
          >
            <img
              src={profile.profile_image}
              alt={`${profile.name}'s profile image`}
              width={100}
              height={100}
              className="rounded-lg mb-4"
            />
            <h2 className="text-2xl text-black font-semibold mb-2">{profile.name}</h2>
            <p className="mb-1 text-black"><strong>Skill:</strong> {profile.skill}</p>
            <p className="mb-1 text-black"><strong>Experience:</strong> {profile.experience}</p>
            </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error in TestPage:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        Something went wrong. Please try again later.
      </div>
    );
  }
}
