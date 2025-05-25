import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import type { Internship } from "../types";

interface InternshipModalProps {
  internship: Internship | null;
  onClose: () => void;
}

const InternshipModal: React.FC<InternshipModalProps> = ({ internship, onClose }) => {
  const [whyText, setWhyText] = useState("");

  const handleApply = () => {
    if (whyText.trim().length ===0) {
      toast.error("Please provide why should we select you in detail!");
      return;
    }

    toast.success("Successfully Applied!");
    onClose();
  };

  const renderTag = (label: string) => (
    <span className="inline-block text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full mr-2 mb-2">
      {label}
    </span>
  );

  return (
    <AnimatePresence>
      {internship && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800  dark:text-gray-100 p-6 rounded-2xl w-[95%] max-w-3xl shadow-2xl relative"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xl text-gray-500 dark:text-gray-300 hover:text-red-500"
            >
              <IoMdClose />
            </button>

            <div className="flex gap-4 items-start">
            <img
                            src={"/placeholder_logo.svg"}
                            alt={internship.company_name}
                            className="w-12 h-12 rounded-lg bg-gray-100 object-contain"
              />
              <div>
                <h2 className="text-2xl font-semibold">{internship.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {internship.company_name} • {internship.location_names.join(", ")}
                </p>
                {internship.application_status_message?.to_show && (
                  <p
                    className={`text-xs mt-1 font-medium ${
                      internship.application_status_message.type === "success"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {internship.application_status_message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4 flex flex-wrap gap-2 text-sm">
              {renderTag(` ${internship.start_date}`)}
              {renderTag(` ${internship.duration}`)}
              {renderTag(
                internship.stipend.salaryValue2
                  ? `₹${internship.stipend.salaryValue1} - ₹${internship.stipend.salaryValue2} ${internship.stipend.currency}`
                  : `₹${internship.stipend.salaryValue1} ${internship.stipend.currency}`
              )}
              {internship.part_time && renderTag("Part-Time")}
              {internship.work_from_home && renderTag("Work From Home")}
              {internship.is_ppo && renderTag("PPO Offer")}
              {internship.ppo_salary && renderTag(`PPO: ₹${internship.ppo_salary}`)}
              {internship.job_experience && renderTag(`Experience: ${internship.job_experience}`)}
              {internship.segment && renderTag(internship.segment)}
              {internship.internship_type_label_value && renderTag(internship.internship_type_label_value)}
              {internship.campaign_names.length > 0 &&
                internship.campaign_names.map((c) => renderTag(`Campaign: ${c}`))}
            </div>

            {internship.message && internship.to_show_card_message && (
              <p className="text-sm text-yellow-600 bg-yellow-100 dark:bg-yellow-900 px-3 py-2 rounded-md mb-4">
                {internship.message}
              </p>
            )}

            <label className="block mb-2 font-medium text-sm">
              Why should we select you?
            </label>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
              rows={4}
              placeholder="Write your motivation or relevant skills here..."
              value={whyText}
              onChange={(e) => setWhyText(e.target.value)}
            />

            <button
              onClick={handleApply}
              className="mt-4 float-right bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Apply
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InternshipModal;
