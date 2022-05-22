import { IBanner } from "@/Components/Banner/Banner";
import { getBannersListService } from "@/Services/BannerService";

interface IBannerActions {
  getBannersList: () => Promise<IBanner[]>;
}

export const useBannerActions = (): IBannerActions => {
  return {
    getBannersList: () => getBannersListService(),
  };
};
