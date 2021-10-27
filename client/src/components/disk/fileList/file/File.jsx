import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DirLogo from '../../../../assets/img/dir.svg';
import FileLogo from '../../../../assets/img/file.svg';
import DownloadLogo from '../../../../assets/img/download.svg';
import DeleteLogo from '../../../../assets/img/delete.svg';

import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

import './File.css';

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);
    const view = useSelector((state) => state.file.view);

    const openDirHandler = (file) => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    };

    const downloadClickHandler = (e) => {
        e.stopPropagation();
        downloadFile(file);
    };

    const deleteClickHandler = (e) => {
        e.stopPropagation();
        dispatch(deleteFile(file));
    };

    if (view === 'plate') {
        return (
            <div className="file-plate" onClick={() => openDirHandler(file)}>
                <img
                    src={file.type === 'dir' ? DirLogo : FileLogo}
                    alt={file.type === 'dir' ? 'directory' : 'file'}
                    className="file-plate__img"
                />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' && (
                        <button
                            onClick={(e) => downloadClickHandler(e)}
                            className="file-plate__btn file__download"
                        >
                            <img
                                width={28}
                                height={28}
                                src={DownloadLogo}
                                alt="download"
                            />
                        </button>
                    )}
                    <button
                        className="file-plate__btn file__delete"
                        onClick={(e) => deleteClickHandler(e)}
                    >
                        <img
                            width={14}
                            height={16}
                            src={DeleteLogo}
                            alt="delete"
                        />
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'list') {
        return (
            <div className="file" onClick={() => openDirHandler(file)}>
                <img
                    src={file.type === 'dir' ? DirLogo : FileLogo}
                    alt={file.type === 'dir' ? 'directory' : 'file'}
                    className="file__img"
                />
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">
                    {file.type !== 'dir' ? sizeFormat(file.size) : ''}
                </div>
                {file.type !== 'dir' && (
                    <button
                        onClick={(e) => downloadClickHandler(e)}
                        className="file__btn file__download"
                    >
                        <img
                            width={28}
                            height={28}
                            src={DownloadLogo}
                            alt="download"
                        />
                    </button>
                )}
                <button
                    className="file__btn file__delete"
                    onClick={(e) => deleteClickHandler(e)}
                >
                    <img width={14} height={16} src={DeleteLogo} alt="delete" />
                </button>
            </div>
        );
    }
};

export default File;
