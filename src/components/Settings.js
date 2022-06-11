import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
  const PATH = "/configs";
  const [fat, setFat] = useState('');
  const [fc, setFc] = useState('');
  useEffect(() => {
    document.title = "React FB Manager | Settings";

    const fetchFat = async () => {
      const result = await axios(PATH + "/fat");
      setFat(result.data.data);
    };
    const fetchFc = async () => {
      const result = await axios(PATH + "/fc");
      setFc(result.data.data);
    };

    fetchFat();
    fetchFc();
  }, []);

  const save = async () => {
    const resFat = await axios.post(PATH + "/fat", {
      access_token: fat,
    });
    if (resFat.data) {
      toast.success("Successfully saved FAT!");
    }
    const resFc = await axios.post(PATH + "/fc", {
      cookie: fc,
    });
    if (resFc.data) {
      toast.success("Successfully saved FC!");
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
          {fat && (
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow-md"
              placeholder="eAA..."
              value={fat || ""}
              onChange={(e) => setFat(e.target.value)}
            />
          )}
        </div>

        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
          <div className="flex -mr-px">
            <span className="flex items-center leading-normal bg-gray-200 rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-gray-500">
              FB Cookie
            </span>
          </div>
          {fc && (
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow-md"
              placeholder="sb=..."
              value={fc || ""}
              onChange={(e) => setFc(e.target.value)}
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
