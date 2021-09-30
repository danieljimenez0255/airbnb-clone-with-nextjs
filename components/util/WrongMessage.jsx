import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WrongMessage = ({ icon, headerText, desc }) => {
  return (
    <section className="inline-flex border border-authGray rounded-xl p-4 mb-6">
      <div className="mr-3">
        <FontAwesomeIcon icon={icon} className="text-[#c13514] wrongIcon" />
      </div>
      <div>
        <h3 className="font-bold">{headerText}</h3>
        <p className="text-[#717171] leading-[18px] text-[14px] font-medium">
          {desc}
        </p>
      </div>
    </section>
  );
};

export default WrongMessage;
