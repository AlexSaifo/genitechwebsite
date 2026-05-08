"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

type TeamMember = {
  image: string;
  roleKey: string;
  nameKey: string;
  imagePosition?: string;
};

const members: TeamMember[] = [
  {
    image:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6014997541256105139-y%201.png",
    roleKey: "teamRoleDesign",
    nameKey: "teamMember1",
    imagePosition: "center top",
  },
  {
    image:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6042046167249522529-w%201.png",
    roleKey: "teamRoleDesign",
    nameKey: "teamMember2",
    imagePosition: "center top",
  },
  {
    image:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6014997541256105140-y%201.png",
    roleKey: "teamRoleDesign",
    nameKey: "teamMember3",
    imagePosition: "center top",
  },
  {
    image:
      "/assets/images/team-members/telegram-cloud-photo-size-4-6014997541256105141-y%201.png",
    roleKey: "teamRoleDesign",
    nameKey: "teamMember4",
    imagePosition: "center top",
  },
];

export default function TeamMembersSection() {
  const t = useTranslations("Home");
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="team" className="relative px-4 py-14 md:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-276 flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full max-w-120 flex-col items-center text-center">
          <h2 className="m-0 w-full bg-[linear-gradient(89.18deg,#0CA5F0_15.53%,#FFFFFF_220.84%)] bg-clip-text text-[30px] font-black leading-[1.35] text-transparent min-[500px]:text-[34px] lg:text-[36px]">
            {t("teamTitle")}
          </h2>
          <p className="m-0 mt-1 w-full text-[16px] leading-[1.9] text-white min-[500px]:text-[17px] lg:text-[18px]">
            {t("teamSubtitle")}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 justify-items-center gap-5 min-[560px]:grid-cols-2 min-[560px]:gap-6 lg:grid-cols-4 lg:gap-6">
          {members.map((member, idx) => (
            <article
              key={member.image}
              className={`group relative h-105.75 w-full max-w-64.5 perspective-distant ${flipped === idx ? "is-flipped" : ""}`}
              onClick={() => setFlipped((f) => (f === idx ? null : idx))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFlipped((f) => (f === idx ? null : idx));
              }}
            >
              <div className={`relative h-full w-full rounded-3xl transition-transform duration-700 ease-out transform-3d ${flipped === idx ? "transform-[rotateY(180deg)]" : "group-hover:transform-[rotateY(180deg)]"}`}>
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/16 bg-[linear-gradient(168.48deg,rgba(255,255,255,0.12)_-83.31%,rgba(255,255,255,0.06)_26.56%,rgba(255,255,255,0.07)_111.32%)] backface-hidden">
                  <Image
                    src={member.image}
                    alt={t(member.nameKey)}
                    fill
                    sizes="(max-width: 560px) 92vw, (max-width: 1024px) 45vw, 258px"
                    className="object-cover"
                    style={{ objectPosition: member.imagePosition ?? "center center" }}
                    draggable={false}
                  />

                  <div className="absolute inset-x-0 top-0 p-6">
                    <p className="m-0 text-[16px] leading-[1.2] text-white/66">{t(member.roleKey)}</p>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-42.5 bg-[linear-gradient(180deg,rgba(9,9,19,0)_0%,rgba(9,9,19,0.37)_45.5%,#090913_100%)]" />

                  <div className="absolute inset-x-0 bottom-5 px-6">
                    <h3 className="m-0 text-center text-[30px] font-bold leading-[1.1] text-white">
                      {t(member.nameKey)}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-[linear-gradient(345.38deg,#A81F99_-98.81%,rgba(0,40,89,0.76)_26.43%,rgba(12,165,240,0.83)_124.42%)] px-3.25 py-8 text-center backface-hidden transform-[rotateY(180deg)]">
                  <div className="flex w-full max-w-58 flex-col items-center gap-4">
                    <Image
                      src="/genitech-icon.svg"
                      alt={t("teamLogoAlt")}
                      width={102}
                      height={37}
                      className="h-auto w-25.5"
                      draggable={false}
                    />
                    <h3 className="m-0 w-full text-[24px] font-bold leading-[1.1] text-white">
                      {t(member.nameKey)}
                    </h3>
                    <p className="m-0 w-full text-[16px] leading-[1.2] text-white/66">{t(member.roleKey)}</p>
                  </div>

                  <p className="m-0 mt-6 w-full text-[16px] leading-[1.85] text-white">
                    {t("teamBackDescription")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
