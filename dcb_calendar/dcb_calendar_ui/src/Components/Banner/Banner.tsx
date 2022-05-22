import { useBannerActions } from "@/Actions/BannerAction";
import React, { useEffect, useState } from "react";
import style from "./Banner.less";

export interface IBanner {
  id: number;
  action_link: string;
  action_text: string;
  description: string;
  image: string;
  title: string;
}

export const Banner: React.FC = () => {
  const { getBannersList } = useBannerActions();
  const [banner, setBanner] = useState<IBanner>();

  const getBanner = async () => {
    const bannersList = await getBannersList();
    if (Array.isArray(bannersList) && bannersList[0]) {
      setBanner(bannersList[0]);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  if (!banner) return null;
  return (
    <div className={style.banner}>
      <img className={style.bannerImage} src={banner.image} />
      <div className={style.bannerInfo}>
        <h2 className={style.bannerTitle}>{banner.title}</h2>
        <p className={style.bannerDescription}>{banner.description}</p>
        <a className={style.bannerButton} href={banner.action_link}>
          {banner.action_text}
        </a>
      </div>
    </div>
  );
};
