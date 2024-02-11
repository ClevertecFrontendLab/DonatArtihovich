import { Card, Flex, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import cls from './main-content.module.scss'
import { ActionCard } from "@shared/ui"
import { CalendarOutlined, HeartFilled, IdcardOutlined } from "@ant-design/icons"
import { useWindowSize } from "@uidotdev/usehooks"

export const MainContent = () => {

    return (
        <Content style={{ flex: 1 }}>
            <Flex vertical className={cls.content}>
                <Card className={cls.abilitiesCard}>
                    <Typography.Text className={cls.abilitiesCardText}>
                        С CleverFit ты сможешь:
                        <br />— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                        <br />— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;
                        <br />— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;
                        <br />— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
                    </Typography.Text>
                </Card>
                <Card className={cls.aboutCard}>
                    <Typography.Text className={cls.aboutCardText}>
                        CleverFit — это не просто приложение, а твой личный помощник в<br /> мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Typography.Text>
                </Card>
                <Flex justify='space-between' className={cls.actionCardsWrapper}>
                    <ActionCard
                        title='Расписать тренировки'
                        buttonTitle='Тренировки'
                        buttonIcon={<HeartFilled style={{ color: 'var(--primary-light-6)' }} />}
                    />
                    <ActionCard
                        title='Назначить календарь'
                        buttonTitle='Календарь'
                        buttonIcon={<CalendarOutlined style={{ color: 'var(--primary-light-6)' }} />}
                    />
                    <ActionCard
                        title='Заполнить профиль'
                        buttonTitle='Профиль'
                        buttonIcon={<IdcardOutlined style={{ color: 'var(--primary-light-6)' }} />}
                    />
                </Flex>
            </Flex>
        </Content>
    )
}