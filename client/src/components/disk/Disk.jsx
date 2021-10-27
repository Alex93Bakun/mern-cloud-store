import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFiles, uploadFile } from '../../actions/file';

import FileList from './fileList/FileList';

import './Disk.css';
import Popup from './Popup';
import {
    setCurrentDir,
    setPopupDisplay,
    setView,
} from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.file.currentDir);
    const dirStack = useSelector((state) => state.file.dirStack);
    const loader = useSelector((state) => state.app.loader);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    const showPopupHandler = () => {
        dispatch(setPopupDisplay(`flex`));
    };

    const backClickHandler = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    };

    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    };

    const dragEnterHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };

    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    };

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        );
    }

    return !dragEnter ? (
        <div
            className="disk"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className="disk__btns">
                <button
                    className="disk__back"
                    onClick={() => backClickHandler()}
                >
                    Назад
                </button>
                <button
                    className="disk__create"
                    onClick={() => showPopupHandler()}
                >
                    Создать папку
                </button>
                <div className="disk__upload">
                    <label
                        htmlFor="disk__upload-input"
                        className="disk__upload-label"
                    >
                        Загрузить файл
                    </label>
                    <input
                        type="file"
                        id="disk__upload-input"
                        className="disk__upload-input"
                        multiple
                        onChange={(event) => fileUploadHandler(event)}
                    />
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="disk__select"
                >
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
                <button
                    className="disk__plate"
                    onClick={() => dispatch(setView('plate'))}
                />
                <button
                    className="disk__list"
                    onClick={() => dispatch(setView('list'))}
                />
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
    ) : (
        <div
            className="drop-area"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
            onDrop={dropHandler}
        >
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;
