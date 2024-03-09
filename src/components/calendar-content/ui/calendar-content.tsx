import { useWindowSize } from "@uidotdev/usehooks"
import { Content } from "antd/lib/layout/layout"

type CalendarContentProps = {
    isSiderCollapsed: boolean;
}

export const CalendarContent = ({ isSiderCollapsed }: CalendarContentProps) => {
    const { width } = useWindowSize()

    return !width ? null : (
        <Content style={{ width: width > 700 ? (width > 1440 ? 1440 : width) - (isSiderCollapsed ? 64 : 208) : undefined }}>

        </Content>
    )
}