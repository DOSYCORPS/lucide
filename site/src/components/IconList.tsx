import { Button, Flex, Grid, Text, useToast } from '@chakra-ui/react';
import download from 'downloadjs';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import { useCallback, useContext, useMemo } from 'react';
import { useCustomizeIconContext } from './CustomizeIconContext';
import { IconWrapper } from './IconWrapper';
import { useRouter } from 'next/router';
import ModifiedTooltip from './ModifiedTooltip';
import IconListItem from './IconListItem';

const IconList = ({ icons, renderLink = true }) => {
  const router = useRouter();
  const toast = useToast();
  const { color, size, strokeWidth } = useCustomizeIconContext();
  const { search } = router.query;

  const query = useMemo(() => (search !== undefined ? { search } : {}), [search]);

  return (
    <Grid templateColumns={`repeat(auto-fill, minmax(150px, 1fr))`} gap={5} marginBottom="320px">
      {icons.map(icon => {
        const actualIcon = icon.item ? icon.item : icon;
        const { name, content, contributors } = actualIcon;

        if (renderLink) {
          return (
            <Link
              key={name}
              scroll={false}
              shallow={true}
              href={{
                pathname: '/icon/[iconName]',
                query: {
                  ...query,
                  iconName: name,
                },
              }}
              passHref
            >
              <IconListItem {...icon} />
            </Link>
          );
        }

        return <IconListItem {...icon} />;
      })}
    </Grid>
  );
};

export default IconList;
