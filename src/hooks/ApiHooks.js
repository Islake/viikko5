import {useEffect, useState} from 'react';
import {fetchData} from '../lib/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {getUserById} = useUser();

  const getMedia = async () => {
    try {
      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const mediaWithUser = await Promise.all(
        mediaResult.map(async (mediaItem) => {
          const userResult = await getUserById(mediaItem.user_id);
          return {...mediaItem, username: userResult.username};
        }),
      );

      setMediaArray(mediaWithUser);
    } catch (error) {
      console.log(error);
    }
  };

  const postMedia = async (file, inputs, token) => {
    try {
      const mediaData = {
        title: inputs.title,
        description: inputs.description,
        filename: file.name,
        media_type: file.type,
        filesize: file.size,
      };

      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      };

      const postResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
        options,
      );

      return postResult;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray, postMedia};
};

const useUser = () => {
  const getUserById = async (id) => {
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/' + id,
    );
    return userResult;
  };

  const getUserByToken = async (token) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const tokenResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options,
    );

    return tokenResult;
  };

  return {getUserById, getUserByToken};
};

const useAuthentication = () => {
  const login = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      options,
    );
    return loginResult;
  };

  const register = async (input) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
  };

  return {login, register};
};

const useFile = () => {
  const postFile = async (file, token) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      };

      const fileData = await fetchData(
        import.meta.env.VITE_UPLOAD_SERVER + '/upload',
        options,
      );

      return fileData;
    } catch (error) {
      console.log(error);
    }
  };

  return {postFile};
};

export {useMedia, useUser, useAuthentication, useFile};
