import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router-dom';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const {postMedia} = useMedia();
  const {postFile} = useFile();

  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const uploadResult = await postFile(file, token);
      const serverFile = new File([file], uploadResult.data.filename, {
        type: file.type,
      });
      await postMedia(serverFile, inputs, token);

      navigate('/');
    } catch (e) {
      alert(e.message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
        <>
            <h1>Upload</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows={5}
                        id="description"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="file">File</label>
                    <input
                        name="file"
                        type="file"
                        id="file"
                        accept="image/*, video/*"
                    onChange={handleFileChange}
                    />
                </div>
                <img
                    src={
                        file
                        ? URL.createObjectURL(file)
                        : 'https://via.placeholder.com/200?text=Choose+image'
                    }
                    alt="preview"
                    width="200"
                />
                <button
                    type="submit"
                    disabled={file && inputs.title.length > 3 ? false : true}
                >
                    Upload
                </button>
            </form>
        </>
    );
};
export default Upload;
