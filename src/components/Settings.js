import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
  const PATH = "/settings";
  const [settings, setSettings] = useState({});
  useEffect(() => {
    document.title = "React FB Manager | Settings"

    const fetchData = async () => {
      const result = await axios(PATH);
      setSettings(result.data);
    };

    fetchData();
  }, []);

  const save = async () => {
    const result = await axios.post(PATH, {
      ...settings,
    });
    if (result.data) {
      toast.success("Successfully saved!");
    }
  };

  return (
    <>
      <div className="w-2/3 p-4 mx-auto">
        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
          <div className="flex -mr-px">
            <span className="flex items-center leading-normal bg-gray-200 rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-gray-500">
              FB Access Token
            </span>
          </div>
          {settings && (
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow-md"
              placeholder="eAA..."
              value={settings.access_token || ""}
              onChange={(e) =>
                setSettings({ ...settings, access_token: e.target.value })
              }
            />
          )}
        </div>
        <button
          className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bol py-2 px-4 rounded inline-flex items-center"
          onClick={save}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Settings;
