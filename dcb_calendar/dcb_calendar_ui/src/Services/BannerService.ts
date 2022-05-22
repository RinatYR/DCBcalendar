export const getBannersListService = async () => {
    const bannersData = await fetch("/rest/mainevent");
    //TODO добавить кнопку повторить и вывод ошибки
    if(bannersData.status !== 200) return [];
    const bannersList = await bannersData.json();
  
    return bannersList;
  };
  