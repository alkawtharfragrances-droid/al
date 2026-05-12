"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Campaign = {
  id: string;

  title: string;

  subtitle: string;

  image: string;

  active: boolean;

  type: string;

  backgroundStyle: string;
};

export default function CampaignSection() {

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const fetchCampaigns =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "campaigns"
            )
          );

        const fetched =
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (campaign: any) =>
                campaign.active
            ) as Campaign[];

        setCampaigns(fetched);

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    fetchCampaigns();

  }, []);

  return (

    <section className="py-32 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20 text-center">

          <p
            className="
              uppercase
              tracking-[8px]
              text-yellow-500
              mb-6
            "
          >
            Featured Collections
          </p>

          <h2 className="text-6xl font-bold mb-6">

            Seasonal Campaigns

          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">

            Curated luxury fragrance
            experiences crafted for
            every season and occasion.

          </p>

        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10">

          {campaigns.map(
            (campaign) => (

              <div
                key={campaign.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[40px]
                  border border-white/10
                  h-[520px]
                "
              >

                {/* Background */}
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/30
                    to-transparent
                  "
                />

                {/* Content */}
                <div
                  className="
                    relative z-10
                    h-full
                    flex flex-col
                    justify-end
                    p-10
                  "
                >

                  {/* Type */}
                  <div
                    className="
                      mb-5
                      inline-flex
                      w-fit
                      px-4 py-2
                      rounded-full
                      bg-yellow-500
                      text-black
                      text-xs
                      uppercase
                      tracking-[3px]
                      font-semibold
                    "
                  >
                    {campaign.type}
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      text-5xl
                      font-bold
                      mb-5
                    "
                  >
                    {campaign.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="
                      text-zinc-300
                      text-lg
                      leading-relaxed
                      max-w-lg
                    "
                  >
                    {campaign.subtitle}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );
}