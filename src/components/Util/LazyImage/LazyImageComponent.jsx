import React, {PureComponent} from 'react';
import * as PropTypes from 'prop-types';

const awsBase = process.env.REACT_APP_S3_BASE_URL;

export class LazyImage extends PureComponent {
    isUnmounted = false;

    image = new Image();

    state = {
        isLoaded: true,
        isActuallyLoaded: false
    };

    static propTypes = {
        src: PropTypes.string,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        aws: PropTypes.bool,
        bg: PropTypes.bool,
        className: PropTypes.string,
        tag: PropTypes.string,
        style: PropTypes.object,
        alt: PropTypes.string,
        childClassName: PropTypes.string,
        title: PropTypes.string,
    };

    static defaultProps = {
        aws: true,
        alt: '',
        title: '',
        bg: false,
        childClassName: '',
        tag: 'div',
        style: {}
    };

    componentDidMount() {
        if (this.props.src) {
            this.image.onload = this.onLoad;
            this.image.onerror = this.onError;
            this.image.src = this.actualImageUrl();
        }
        setTimeout(() => {
            if (!this.state.isActuallyLoaded && !this.isUnmounted) {
                this.setState({isLoaded: false});
            }
            else {
                this.image.onload = null;
                this.image.onerror = null;
            }
        }, 1);
    }

    componentWillUnmount() {
        this.isUnmounted = true;
        this.image.onload = undefined;
        this.image.onerror = undefined;
    }

    onLoad = () => this.setState({isLoaded: true, isActuallyLoaded: true});

    onError = () => this.setState({isLoaded: false, isActuallyLoaded: false});

    imageUrl = () =>
        this.state.isLoaded || this.state.isActuallyLoaded
            ? this.actualImageUrl()
            : this.defaultImage();

    actualImageUrl() {
        const {aws, src} = this.props;
        return aws && src && !src.match(/^http(?:s?):\/\//)
            ? `${awsBase}${src}`
            : src;
    }

    defaultImage = () =>
        `https://via.placeholder.com/${this.props.width}x${this.props.height}.png?text=%20`;

    render() {
        const {tag, bg, className, alt, title, height, width, style, children} = this.props;
        const Tag = tag;

        return bg
            ? <Tag
                className={className}
                title={title}
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    backgroundImage: `url(${this.imageUrl()})`,
                    backgroundSize: 'cover',
                    backgroundColor: '#ccc',
                    ...style
                }}
            >{children || null}</Tag>
            : <img
                className={className}
                src={this.imageUrl()}
                alt={alt}
                title={title}
                height={height}
                width={width}
                style={style}
            />;
    }
}

export default LazyImage;
