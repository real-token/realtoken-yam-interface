import { Flex, Text } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons";
import { openInNewTab } from "src/utils/window";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: var(--mantine-spacing-md);
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: transparent;
    align-items: center;
    justify-content: start;
    &:hover{
        borderBottomColor: var(--mantine-color-brand-9);
        cursor: pointer;
    }
`;

interface TextUrlProps{
    url: string;
    children: React.ReactNode;
}
export const TextUrl = ({ url, children } : TextUrlProps) => {
    return(
        <Container onClick={() => openInNewTab(url)}>
            <Text>{children}</Text>
            <IconExternalLink size={16}/>
        </Container>
    )
}