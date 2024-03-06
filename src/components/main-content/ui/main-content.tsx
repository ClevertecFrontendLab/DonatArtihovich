import { Card, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import cls from './main-content.module.scss'
import { ActionCard } from "@components/action-card"
import { CalendarOutlined, HeartFilled, IdcardOutlined } from "@ant-design/icons"
import { useWindowSize } from "@uidotdev/usehooks"
import { classNames } from "@utils/lib/class-names"

type MainContentProps = {
    isSiderCollapsed: boolean;
}

export const MainContent = ({ isSiderCollapsed }: MainContentProps) => {
    const { width } = useWindowSize()

    if (width)
        return (
            <Content style={{ width: width > 700 ? (width > 1440 ? 1440 : width) - (isSiderCollapsed ? 64 : 208) : undefined }}>
                <div className={cls.content}>
                    <Card className={classNames(cls.abilitiesCard, isSiderCollapsed && cls.abilitiesCardStretched)}>
                        <Typography.Text className={cls.abilitiesCardText}>
                            С CleverFit ты сможешь:
                            <br />— планировать свои тренировки{width < 540 && <br />} на календаре, выбирая тип{width && (width < 900 && !isSiderCollapsed || width < 702) && <br />} и уровень нагрузки;
                            <br />— отслеживать свои достижения{width < 540 && <br />} в разделе статистики,{width && width < 900 && !isSiderCollapsed && width > 702 && <br />} сравнивая{width < 540 && <br />} свои результаты{(width < 900 && isSiderCollapsed && width > 702 || width > 1200) && <br />} с нормами{width < 540 && <br />} и рекордами;
                            <br />— создавать свой профиль, где{width < 540 && <br />} ты можешь загружать свои фото,{width && width < 900 && !isSiderCollapsed && <br />} видео и отзывы{((width < 900 && isSiderCollapsed && width > 702) || width > 1200) && <br />} о тренировках;
                            <br />— выполнять расписанные{width < 540 && <br />} тренировки для разных частей{width < 540 && !isSiderCollapsed && <br />} тела,{width && width < 900 && !isSiderCollapsed && width > 702 && <br />} следуя подробным{(width > 1200 || width < 702 && !isSiderCollapsed) && <br />} инструкциям{width < 540 && isSiderCollapsed && < br />} и советам профессиональных тренеров.
                        </Typography.Text>
                    </Card>
                    <Card className={classNames(cls.aboutCard, isSiderCollapsed && cls.aboutCardStretched)}>
                        <Typography.Text className={cls.aboutCardText}>
                            CleverFit — это не просто приложение, а твой{width && width < 900 && !isSiderCollapsed && <br />} личный помощник{width && (width > 900 || (width < 900 && isSiderCollapsed && width > 702)) && <br />} в мире фитнеса.{width < 540 && isSiderCollapsed && <br />}Не откладывай{width && width < 900 && !isSiderCollapsed && <br />} на завтра — {width < 540 && <br />}начни тренироваться{width && (width > 900 || (isSiderCollapsed && width > 702)) && <br />} уже сегодня!
                        </Typography.Text>
                    </Card>
                    <div className={classNames(cls.actionCardsWrapper, isSiderCollapsed && cls.actionCardsWrapperStretched)}>
                        <ActionCard
                            title='Расписать тренировки'
                            buttonTitle='Тренировки'
                            buttonIcon={<HeartFilled style={{ color: 'var(--primary-light-6)' }} />}
                            isStretched={isSiderCollapsed}
                        />
                        <ActionCard
                            title='Назначить календарь'
                            buttonTitle='Календарь'
                            buttonIcon={<CalendarOutlined style={{ color: 'var(--primary-light-6)' }} />}
                            isStretched={isSiderCollapsed}
                        />
                        <ActionCard
                            title='Заполнить профиль'
                            buttonTitle='Профиль'
                            buttonIcon={<IdcardOutlined style={{ color: 'var(--primary-light-6)' }} />}
                            isStretched={isSiderCollapsed}
                        />
                    </div>
                </div>
            </Content >
        )
}