import axios from "axios";

export const upload = (path,formModel) => {
    const fd = new FormData()
    for (let key in formModel) {
      fd.append(key, formModel[key])
    }
    // console.log(fd);
    return axios.post(path, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}