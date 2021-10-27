import React from 'react';
import { useSelector } from 'react-redux';

import File from './file/File';

import './FileList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FileList = () => {
    const files = useSelector((state) => state.file.files);
    const view = useSelector((state) => state.file.view);

    if (files.length === 0) {
        return <div className="emptyDir">Файлы не найдены</div>;
    }

    if (view === 'plate') {
        return (
            <div className="filePlate">
                {files.map((file) => (
                    <File key={file._id} file={file} />
                ))}
            </div>
        );
    }

    if (view === 'list') {
        return (
            <div className="fileList">
                <div className="fileList__header">
                    <div className="fileList__name">Название</div>
                    <div className="fileList__date">Дата</div>
                    <div className="fileList__size">Размер</div>
                </div>
                <TransitionGroup>
                    {files.map((file) => (
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames="file"
                            exit={false}
                        >
                            <File file={file} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        );
    }
};

export default FileList;
