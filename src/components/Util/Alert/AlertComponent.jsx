import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as PropTypes from "prop-types";

const Alert = ({isOpen, title, titleClassName, body, showConfirmButton, closeText, confirmText, closeColor, confirmColor, onClose, onConfirm, wrapClassName, setHtmlDangerously = false, ...props}) => {
    return (
        <div className={wrapClassName}>
            <Modal isOpen={isOpen} {...props}>
                <ModalHeader className={titleClassName}>{title}</ModalHeader>
                {
                    setHtmlDangerously
                        ?
                        <ModalBody dangerouslySetInnerHTML={{ __html: body }}/>
                        :
                        <ModalBody>
                            {body}
                        </ModalBody>
                }
                <ModalFooter>
                    { showConfirmButton &&
                    <Button color={confirmColor} onClick={onConfirm}>{confirmText}</Button>
                    }
                    <Button style={{marginLeft: '15px'}} color={closeColor} onClick={onClose}>{closeText}</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
};

Alert.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title:  PropTypes.string.isRequired,
    titleClassName:  PropTypes.string,
    body:  PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    setHtmlDangerously:  PropTypes.bool,
    showConfirmButton: PropTypes.bool,
    closeText: PropTypes.string,
    confirmText: PropTypes.string,
    closeColor: PropTypes.string,
    confirmColor: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    wrapClassName: PropTypes.string,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    scrollable: PropTypes.bool,
    centered: PropTypes.bool,
    fade: PropTypes.bool,
    backdrop: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['static'])
    ]),
};

Alert.defaultProps = {
    isOpen: false,
    titleClassName: 'text-primary',
    setHtmlDangerously: false,
    showConfirmButton: false,
    closeText: 'Close',
    confirmText: 'Confirm',
    closeColor: 'secondary',
    confirmColor: 'primary',
    size: 'md',
    scrollable: true,
    centered: true,
    fade: true,
    backdrop: 'static'
};

export default Alert;