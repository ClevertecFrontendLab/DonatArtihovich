import { Card, Flex, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import cls from './main-content.module.scss'
import { ActionCard } from "@components/action-card"
import { CalendarOutlined, HeartFilled, IdcardOutlined } from "@ant-design/icons"
import { useWindowSize } from "@uidotdev/usehooks"
import classNames from "classnames"

interface MainContentProps {
    isSiderCollapsed: boolean;
}
export const MainContent = ({ isSiderCollapsed }: MainContentProps) => {
    const { width } = useWindowSize()

    return (
        <Content style={{ flex: 1 }}>
            <Flex vertical className={cls.content}>
                <Card className={classNames(cls.abilitiesCard, isSiderCollapsed && cls.abilitiesCardStretched)}>
                    <Typography.Text className={cls.abilitiesCardText}>
                        С CleverFit ты сможешь:
                        <br />— планировать свои тренировки на календаре, выбирая тип{width && width < 900 && !isSiderCollapsed && <br />} и уровень нагрузки;
                        <br />— отслеживать свои достижения в разделе статистики,{width && width < 900 && !isSiderCollapsed && <br />} сравнивая свои результаты с нормами и рекордами;
                        <br />— создавать свой профиль, где ты можешь загружать свои фото,{width && width < 900 && !isSiderCollapsed && <br />} видео и отзывы о тренировках;
                        <br />— выполнять расписанные тренировки для разных частей тела,{width && width < 900 && !isSiderCollapsed && <br />} следуя подробным инструкциям и советам профессиональных тренеров.
                    </Typography.Text>
                </Card>
                <Card className={classNames(cls.aboutCard, isSiderCollapsed && cls.aboutCardStretched)}>
                    <Typography.Text className={cls.aboutCardText}>
                        CleverFit — это не просто приложение, а твой{width && width < 900 && !isSiderCollapsed && <br />} личный помощник в{width && width > 900 && !isSiderCollapsed && <br />} мире фитнеса. Не откладывай{width && width < 900 && !isSiderCollapsed && <br />} на завтра — начни тренироваться{width && width < 900 && isSiderCollapsed && <br />} уже сегодня!
                    </Typography.Text>
                </Card>
                <Flex justify='space-between' className={classNames(cls.actionCardsWrapper, isSiderCollapsed && cls.actionCardsWrapperStretched)}>
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
                </Flex>
            </Flex>
        </Content>
    )
}