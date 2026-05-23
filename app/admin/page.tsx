"use client";

import Link from "next/link";

import {
  useState,
  useEffect,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
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

const campaignTypes = [
  "Ramadan",
  "Eid",
  "Weekend Drop",
  "Summer Collection",
  "Winter Collection",
  "Exclusive Launch",
];

const backgroundStyles = [
  "Golden Glow",
  "Dark Oud",
  "Emerald Night",
  "Royal Black",
  "Amber Smoke",
];

export default function CampaignsPage() {

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [title, setTitle] =
    useState("");

  const [subtitle, setSubtitle] =
    useState("");

  const [type, setType] =
    useState(campaignTypes[0]);

  const [
    backgroundStyle,
    setBackgroundStyle,
  ] = useState(
    backgroundStyles[0]
  );

  const [active, setActive] =
    useState(true);

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  // Edit States
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [
    editSubtitle,
    setEditSubtitle,
  ] = useState("");

  const [
    editActive,
    setEditActive,
  ] = useState(false);

  const [editType, setEditType] =
    useState("");

  const [
    editBackgroundStyle,
    setEditBackgroundStyle,
  ] = useState("");

  const [editFile, setEditFile] =
    useState<File | null>(null);

  const [
    previewImage,
    setPreviewImage,
  ] = useState("");

  // Fetch Campaigns
  const fetchCampaigns = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "campaigns")
        );

      const fetched =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Campaign[];

      setCampaigns(fetched);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    fetchCampaigns();

  }, []);

  // Delete Campaign
  const handleDelete = async (
    id: string
  ) => {

    try {

      await deleteDoc(
        doc(db, "campaigns", id)
      );

      fetchCampaigns();

    } catch (error) {

      console.error(error);

      alert("Failed to delete");
    }
  };

  // Start Edit
  const handleEditStart = (
    campaign: Campaign
  ) => {

    setEditingId(campaign.id);

    setEditTitle(
      campaign.title
    );

    setEditSubtitle(
      campaign.subtitle
    );

    setEditActive(
      campaign.active
    );

    setEditType(
      campaign.type
    );

    setEditBackgroundStyle(
      campaign.backgroundStyle
    );

    setPreviewImage(
      campaign.image
    );

    setEditFile(null);

  };

  // Update Campaign
  const handleUpdate = async (
    id: string
  ) => {

    try {

      let imageUrl =
        previewImage;

      // Upload new image if selected
      if (editFile) {

        const formData =
          new FormData();

        formData.append(
          "file",
          editFile
        );

        formData.append(
          "upload_preset",
          process.env
            .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        const response =
          await fetch(
            `https://api.cloudinary.com/v1_1/${
              process.env
                .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        imageUrl =
          data.secure_url;

      }

      await updateDoc(
        doc(db, "campaigns", id),
        {
          title:
            editTitle,

          subtitle:
            editSubtitle,

          active:
            editActive,

          type:
            editType,

          backgroundStyle:
            editBackgroundStyle,

          image:
            imageUrl,
        }
      );

      setEditingId(null);

      setEditFile(null);

      fetchCampaigns();

      alert(
        "Campaign Updated!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update"
      );

    }

  };

  // Create Campaign
  const handleSubmit = async () => {

    try {

      setLoading(true);

      if (!file) {

        alert(
          "Please upload image"
        );

        return;
      }

      // Upload Image
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${
            process.env
              .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      const imageUrl =
        data.secure_url;

      // Campaign Object
      const campaign = {

        title,

        subtitle,

        image:
          imageUrl,

        active,

        type,

        backgroundStyle,
      };

      // Save
      await addDoc(
        collection(
          db,
          "campaigns"
        ),
        campaign
      );

      alert(
        "Campaign Added!"
      );

      fetchCampaigns();

      // Reset
      setTitle("");

      setSubtitle("");

      setType(
        campaignTypes[0]
      );

      setBackgroundStyle(
        backgroundStyles[0]
      );

      setActive(true);

      setFile(null);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create campaign"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* Navigation */}
        <div className="flex gap-4 mb-12">

          <Link
            href="/admin/dashboard"
            className="
              px-6 py-3
              rounded-2xl
              border border-white/10
              bg-white/5
              hover:bg-white/10
              transition
            "
          >
            Products
          </Link>

          <Link
            href="/admin/campaigns"
            className="
              px-6 py-3
              rounded-2xl
              bg-yellow-500
              text-black
              font-semibold
            "
          >
            Campaigns
          </Link>

        </div>

        {/* Header */}
        <div className="mb-20">

          <p
            className="
              uppercase
              tracking-[8px]
              text-yellow-500
              mb-4
            "
          >
            Marketing
          </p>

          <h1 className="text-6xl font-bold mb-6">
            Campaign Manager
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl">
            Manage homepage campaigns,
            luxury launches, festive sales,
            and seasonal collections.
          </p>

        </div>

        {/* Form */}
        <div
          className="
            rounded-[36px]
            border border-white/10
            bg-white/5
            backdrop-blur-sm
            p-8
            space-y-6
            mb-24
          "
        >

          {/* Title */}
          <div>

            <label className="block mb-3 text-zinc-400">
              Campaign Title
            </label>

            <input
              type="text"
              placeholder="Ramadan Collection"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
                w-full
                bg-black/30
                border border-white/10
                rounded-2xl
                px-6 py-5
                outline-none
              "
            />

          </div>

          {/* Subtitle */}
          <div>

            <label className="block mb-3 text-zinc-400">
              Campaign Subtitle
            </label>

            <textarea
              rows={4}
              placeholder="Crafted for sacred evenings..."
              value={subtitle}
              onChange={(e) =>
                setSubtitle(
                  e.target.value
                )
              }
              className="
                w-full
                bg-black/30
                border border-white/10
                rounded-2xl
                px-6 py-5
                outline-none
              "
            />

          </div>

          {/* Type */}
          <div>

            <label className="block mb-3 text-zinc-400">
              Campaign Type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value
                )
              }
              className="
                w-full
                bg-black/30
                border border-white/10
                rounded-2xl
                px-6 py-5
                outline-none
              "
            >

              {campaignTypes.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                )
              )}

            </select>

          </div>

          {/* Background */}
          <div>

            <label className="block mb-3 text-zinc-400">
              Background Style
            </label>

            <select
              value={
                backgroundStyle
              }
              onChange={(e) =>
                setBackgroundStyle(
                  e.target.value
                )
              }
              className="
                w-full
                bg-black/30
                border border-white/10
                rounded-2xl
                px-6 py-5
                outline-none
              "
            >

              {backgroundStyles.map(
                (style) => (

                  <option
                    key={style}
                    value={style}
                  >
                    {style}
                  </option>

                )
              )}

            </select>

          </div>

          {/* Upload */}
          <div>

            <label className="block mb-3 text-zinc-400">
              Campaign Banner
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                if (
                  e.target.files?.[0]
                ) {

                  setFile(
                    e.target.files[0]
                  );
                }

              }}
              className="
                w-full
                bg-black/30
                border border-white/10
                rounded-2xl
                px-6 py-5
              "
            />

          </div>

          {/* Preview */}
          {file && (

            <div
              className="
                overflow-hidden
                rounded-[30px]
                h-[280px]
                border border-white/10
              "
            >

              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="
                  w-full h-full
                  object-cover
                "
              />

            </div>

          )}

          {/* Active */}
          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={active}
              onChange={(e) =>
                setActive(
                  e.target.checked
                )
              }
            />

            Active Campaign

          </label>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              bg-yellow-500
              hover:bg-yellow-400
              disabled:opacity-50
              text-black
              px-8 py-4
              rounded-2xl
              font-semibold
            "
          >

            {loading
              ? "Uploading..."
              : "Create Campaign"}

          </button>

        </div>

        {/* Campaign Cards */}
        <div className="space-y-8">

          {campaigns.map(
            (campaign) => (

              <div
                key={campaign.id}
                className="
                  flex flex-col lg:flex-row
                  gap-6
                  rounded-[36px]
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                "
              >

                {/* Image */}
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="
                    w-full lg:w-[340px]
                    h-[280px]
                    object-cover
                  "
                />

                {/* Content */}
                <div className="flex-1 p-8">

                  {editingId ===
                  campaign.id ? (

                    <div className="space-y-5">

                      {/* Title */}

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black/30
                          border border-white/10
                          rounded-2xl
                          px-5 py-4
                          outline-none
                        "
                      />

                      {/* Subtitle */}

                      <textarea
                        rows={4}
                        value={
                          editSubtitle
                        }
                        onChange={(e) =>
                          setEditSubtitle(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black/30
                          border border-white/10
                          rounded-2xl
                          px-5 py-4
                          outline-none
                        "
                      />

                      {/* Type */}

                      <select
                        value={editType}
                        onChange={(e) =>
                          setEditType(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black/30
                          border border-white/10
                          rounded-2xl
                          px-5 py-4
                          outline-none
                        "
                      >

                        {campaignTypes.map(
                          (item) => (

                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>

                          )
                        )}

                      </select>

                      {/* Background Style */}

                      <select
                        value={
                          editBackgroundStyle
                        }
                        onChange={(e) =>
                          setEditBackgroundStyle(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black/30
                          border border-white/10
                          rounded-2xl
                          px-5 py-4
                          outline-none
                        "
                      >

                        {backgroundStyles.map(
                          (style) => (

                            <option
                              key={style}
                              value={style}
                            >
                              {style}
                            </option>

                          )
                        )}

                      </select>

                      {/* Upload New Image */}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                          if (
                            e.target.files?.[0]
                          ) {

                            setEditFile(
                              e.target.files[0]
                            );

                            setPreviewImage(
                              URL.createObjectURL(
                                e.target.files[0]
                              )
                            );

                          }

                        }}
                        className="
                          w-full
                          bg-black/30
                          border border-white/10
                          rounded-2xl
                          px-5 py-4
                        "
                      />

                      {/* Image Preview */}

                      {previewImage && (

                        <div
                          className="
                            overflow-hidden
                            rounded-[24px]
                            border border-white/10
                            h-[220px]
                          "
                        >

                          <img
                            src={previewImage}
                            alt="Preview"
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />

                        </div>

                      )}

                      {/* Active */}

                      <label className="flex items-center gap-3">

                        <input
                          type="checkbox"
                          checked={
                            editActive
                          }
                          onChange={(e) =>
                            setEditActive(
                              e.target.checked
                            )
                          }
                        />

                        Active Campaign

                      </label>

                      {/* Actions */}

                      <div className="flex gap-4">

                        <button
                          onClick={() =>
                            handleUpdate(
                              campaign.id
                            )
                          }
                          className="
                            bg-yellow-500
                            hover:bg-yellow-400
                            text-black
                            px-6 py-3
                            rounded-2xl
                            font-semibold
                          "
                        >
                          Save Changes
                        </button>

                        <button
                          onClick={() =>
                            setEditingId(null)
                          }
                          className="
                            border border-white/10
                            bg-white/5
                            hover:bg-white/10
                            px-6 py-3
                            rounded-2xl
                          "
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    <>

                      <div className="flex items-center justify-between mb-6">

                        <div>

                          <p
                            className="
                              text-yellow-500
                              uppercase
                              tracking-[4px]
                              text-sm
                              mb-3
                            "
                          >
                            {campaign.type}
                          </p>

                          <h2 className="text-4xl font-bold mb-3">
                            {campaign.title}
                          </h2>

                          <p className="text-zinc-400 leading-relaxed">
                            {campaign.subtitle}
                          </p>

                        </div>

                        {campaign.active && (

                          <div
                            className="
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
                            Active
                          </div>

                        )}

                      </div>

                      <div className="mb-8">

                        <div
                          className="
                            inline-flex
                            px-4 py-2
                            rounded-full
                            border border-white/10
                            bg-black/20
                            text-zinc-300
                            text-sm
                          "
                        >
                          {
                            campaign.backgroundStyle
                          }
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="flex gap-4">

                        <button
                          onClick={() =>
                            handleEditStart(
                              campaign
                            )
                          }
                          className="
                            bg-blue-500/20
                            hover:bg-blue-500
                            border border-blue-500/30
                            text-blue-400
                            hover:text-white
                            px-5 py-3
                            rounded-2xl
                            transition
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              campaign.id
                            )
                          }
                          className="
                            bg-red-500/20
                            hover:bg-red-500
                            border border-red-500/30
                            text-red-400
                            hover:text-white
                            px-5 py-3
                            rounded-2xl
                            transition
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </>

                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}