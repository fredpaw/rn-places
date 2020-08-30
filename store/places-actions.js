import { documentDirectory, moveAsync } from "expo-file-system";
import { insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = documentDirectory + fileName;

    try {
      await moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.5,
        12.3
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title, image: newPath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
