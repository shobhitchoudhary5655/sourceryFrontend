import { useNotification } from "@/context/NotificationContext";

const NotificationPopup = () => {

    const { popup, setPopup } = useNotification();

    if (!popup) return null;

    return (

        <div
            className="
                fixed
                top-5
                right-5
                bg-white
                shadow-xl
                rounded-xl
                p-4
                border
                z-[9999]
                w-80
            "
        >
            <h3 className="font-bold">
                {popup.title}
            </h3>

            <p className="text-sm mt-1">
                {popup.body}
            </p>

            <button
                className="mt-3 text-purple-600"
                onClick={() => setPopup(null)}
            >
                Close
            </button>
        </div>

    );

};

export default NotificationPopup;