import { StarFilled, StarOutlined } from "@ant-design/icons"
import { Rate } from "antd"
import cls from './star-rating.module.scss'
import { classNames } from "@utils/lib";

type StarRatingProps = {
    disabled?: boolean;
    value: number;
    onChange?: (v: number) => void;
    className?: string;
}

export const StarRating = ({ disabled, value, className, onChange }: StarRatingProps) => {
    return (
        <Rate
            character={({ index }) => index !== undefined && index + 1 <= value
                ? <StarFilled style={{ color: 'var(--character-light-warning)', width: '20px' }} />
                : <StarOutlined style={{ color: 'var(--character-light-warning)', width: '20px' }} />}
            value={value}
            count={5}
            disabled={disabled}
            className={classNames(cls.ratingStars, className)}
            onChange={onChange || (() => undefined)}
        />
    )
}