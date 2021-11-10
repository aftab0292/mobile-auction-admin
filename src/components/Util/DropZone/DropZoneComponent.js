import React, {Component} from "react";
import * as PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import LazyImage from "~components/Util/LazyImage";
import './DropZoneStyle.scss';
import {__} from '~i18n';
const locale = __('DROPZONE_COMPONENT');

class DropZone extends Component {
    static propTypes = {
        accept: PropTypes.string.isRequired,
        onDrop: PropTypes.func.isRequired,
        maxFiles: PropTypes.number.isRequired,
        minFileSize: PropTypes.number,
        maxFileSize: PropTypes.number.isRequired,
        thumbs: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
                aws: PropTypes.bool,
                success: PropTypes.bool,
                error: PropTypes.string
            })
        )
    };

    static defaultProps = {
        minFileSize: 0,
        thumbs: []
    };

    showError = error => locale[error.split('-').join('_').toUpperCase()] || error.split('-').join('_').toUpperCase();

    constructor(props) {
        super(props);
        this.state = {
            iconThumbs: props.thumbs,
            maxFiles: props.maxFiles,
            filesLeftToAccept: props.maxFiles - props.thumbs.length
        }
    }

    onDropAccepted = files => {
        const { filesLeftToAccept } = this.state;
        files = [...files].splice(0, filesLeftToAccept);
        const newFilesLeftToAccept = filesLeftToAccept - files.length
        files.map(file => {
            this.setState(state => ({
                iconThumbs: [...state.iconThumbs, {
                    url: URL.createObjectURL(file),
                    aws: false,
                    success: true
                }],
                filesLeftToAccept: newFilesLeftToAccept
            }));
        });
    };

    onDropRejected = fileRejections => {
        fileRejections.map(fileErrors => {
            this.setState(state => ({
                iconThumbs: [...state.iconThumbs, {
                    url: URL.createObjectURL(fileErrors.file),
                    aws: false,
                    success: false,
                    error: this.showError(fileErrors.errors[0].code)
                }]
            }));
        });
    };

    onFileDrop = files => {
        const { filesLeftToAccept } = this.state;
        files = [...files].splice(0, filesLeftToAccept);
        const { onDrop } = this.props;
        for (let i = 0; i < files.length; i++) {
            onDrop(files[i]);
        }
    };

    render() {
        const { accept, minFileSize, maxFiles, maxFileSize, } = this.props;
        const { filesLeftToAccept, iconThumbs } = this.state;
        return (
            <div className="text-center">
                <Dropzone
                    accept={accept}
                    onDrop={this.onFileDrop}
                    minSize={minFileSize}
                    maxSize={maxFileSize}
                    multiple={maxFiles >= 2}
                    disabled={!filesLeftToAccept}
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}
                >
                    {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                        const isFileTooLarge = rejectedFiles && !!rejectedFiles.filter(file => file.size > maxFileSize).length;
                        return (
                            <div {...getRootProps()} className='dropzone'>
                                <input {...getInputProps()} />
                                <div className="text-center dropzone-text">
                                {!isDragActive && 'Click me or drop a file to upload!'}
                                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                {isDragReject && "Oops! File type not accepted"}
                                {isFileTooLarge && 'File is too large.'}

                                </div>
                                <div className="text-center dropzone-previews mt-1">
                                    { iconThumbs.filter(i => i).map((thumb, index) =>
                                        <LazyImage
                                            key={`preview-${index}`}
                                            className={`dropzone-preview border ${thumb.success ? 'upload-success' : 'upload-error'}`}
                                            src={thumb.url}
                                            aws={thumb.aws}
                                            width={80}
                                            height={60}
                                            title={thumb.error || ''}
                                        />) }
                                </div>
                            </div>
                        )}
                    }
                </Dropzone>
            </div>
        );
    }
}

export default DropZone;
