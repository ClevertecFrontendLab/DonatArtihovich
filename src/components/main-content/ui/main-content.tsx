import { Card, Row, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import cls from './main-content.module.scss'
import { ActionCard } from "@components/action-card"
import { CalendarOutlined, HeartFilled, IdcardOutlined } from "@ant-design/icons"
import { useResize } from "@hooks/use-resize"
import { classNames } from "@utils/lib/class-names"

interface MainContentProps {
    isSiderCollapsed: boolean;
}
export const MainContent = ({ isSiderCollapsed }: MainContentProps) => {
    const { width } = useResize()

    if (width)
        return (
            <Content>
                <div className={cls.content}>
                    <Card className={classNames(cls.abilitiesCard, isSiderCollapsed && cls.abilitiesCardStretched)}>
                        <Typography.Text className={cls.abilitiesCardText}>
                            С CleverFit ты сможешь:
                            <br />— планировать свои тренировки{width < 540 && <br />} на календаре, выбирая тип{width && (width < 900 && !isSiderCollapsed || width < 702) && <br />} и уровень нагрузки;
                            <br />— отслеживать свои достижения{width < 540 && <br />} в разделе статистики,{width && width < 900 && !isSiderCollapsed && <br />} сравнивая{width < 540 && <br />} свои результаты{width < 900 && isSiderCollapsed && width > 702 && <br />} с нормами{width < 540 && <br />} и рекордами;
                            <br />— создавать свой профиль, где{width < 540 && <br />} ты можешь загружать свои фото,{width && width < 900 && !isSiderCollapsed && <br />} видео и отзывы {width && width < 900 && isSiderCollapsed && width > 702 && <br />} о тренировках;
                            <br />— выполнять расписанные тренировки для разных частей тела,{width && width < 900 && !isSiderCollapsed && <br />} следуя подробным инструкциям{width < 540 && <br />} и советам профессиональных тренеров.
                        </Typography.Text>
                    </Card>
                    <Card className={classNames(cls.aboutCard, isSiderCollapsed && cls.aboutCardStretched)}>
                        <Typography.Text className={cls.aboutCardText}>
                            CleverFit — это не просто приложение, а твой{width && width < 900 && !isSiderCollapsed && <br />} личный помощник в{width && width > 900 && !isSiderCollapsed && <br />} мире фитнеса. Не откладывай{width && width < 900 && !isSiderCollapsed && <br />} на завтра — начни тренироваться{width && (width > 900 || (isSiderCollapsed && width > 702)) && <br />} уже сегодня!
                        </Typography.Text>
                    </Card>
                    <Row justify='space-between' align='middle' className={classNames(cls.actionCardsWrapper, isSiderCollapsed && cls.actionCardsWrapperStretched)}>
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
                    </Row>
                </div>
            </Content>
        )
}