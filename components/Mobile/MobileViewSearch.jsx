import MobileSearch from "./MobileSearch";

const MobileView = ({ locations }) => {
  return (
    <>
      <div className="sticky top-0 z-50 flex flex-col justify-between ">
        <MobileSearch locations={locations} />
      </div>
    </>
  );
};

export default MobileView;
