import InfoAbout from "../infoAbout/InfoAbout";
import RideBanner from "../rideBanner/RideBanner";
import Manufacturer from "../manufacturer/Manufacturer";

const InfoPage = () => {
    return (
        <>
            <InfoAbout/>
            <Manufacturer/>
            <RideBanner/>
        </>
    );
};

export default InfoPage;