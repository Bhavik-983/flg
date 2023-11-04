import { useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Stack, Avatar, Button } from '@mui/material';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import AddMemberModal from 'src/components/modal/AddMemberModal';

// ----------------------------------------------------------------------

export default function MemberView() {
  const { user } = useMockedUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Typography variant="h4" sx={{ my: '10px', color: '#444444' }}>
        Member
      </Typography>

      <Box
        sx={{
          minHeight: 400,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          py: 4,
          px: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" width="50%">
          <Typography
            sx={{
              fontWeight: 'bold',
              p: 2,
              fontSize: 16,
            }}
            variant="body2"
          >
            Member(1)
          </Typography>
          <Button
            variant="contained"
            sx={{
              m: 1,
              fontSize: 12,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 2px 4px 1px rgba(0,0,0,.11)',
            }}
            onClick={handleModalOpen}
          >
            <Typography
              sx={{
                fontSize: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VscAdd
                style={{
                  height: 20,
                  width: 20,
                  paddingRight: 2,
                }}
              />
              Add member
            </Typography>
          </Button>
        </Box>
        <Stack sx={{ justifyContent: 'space-between', width: '100%', mt: 1 }}>
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              width: '50%',
              p: 1,
              ml: 2,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              boxShadow: '0 2px 4px 1px rgba(0,0,0,.11)',
            }}
          >
            <Box sx={{ p: 1, pb: 1, display: 'flex', gap: 1 }}>
              <Avatar
                src={user?.photoURL}
                alt={user?.displayName}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '15%',
                  border: (theme) => `solid 2px ${theme.palette.background.default}`,
                }}
              >
                {user?.displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                  variant="body2"
                >
                  John Doe
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                  }}
                >
                  john@gmail.com
                </Typography>
              </Box>
              <Box
                position="absolute"
                sx={{
                  width: '50%',
                  right: 0,
                  cursor: 'pointer',
                }}
              >
                <BiDotsVerticalRounded
                  style={{
                    height: 30,
                    width: 25,
                    color: 'gray',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: '#f6f6f6',
              borderTop: '1px solid #ececec',
              pl: 1,
              py: '3px',
              ml: 2,
              boxShadow: '0 2px 4px 1px rgba(0,0,0,.11)',
              width: '50%',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              Project Admin
            </Typography>
          </Box>
        </Stack>
        <AddMemberModal isOpen={isOpen} onClose={handleModalClose} />
      </Box>
    </>
  );
}
