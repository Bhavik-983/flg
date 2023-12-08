/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import FileSaver from 'file-saver';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import useProjectHook from 'src/hooks/use-project-hook';
import useLanguageHook from 'src/hooks/use-language-hook';

import { NewLanguage } from 'src/store/slices/LanguageSlice';

import PageHeading from 'src/components/heading/PageHeading';
import { LoadingScreen } from 'src/components/loading-screen';

import LanguageListCard from './LanguageListCard';

// ----------------------------------------------------------------------

export default function SettingView() {
  const { projectLanguage, handleDownloadData, isLoading } = useLanguageHook();
  console.log(projectLanguage);
  const { currentProject } = useProjectHook();

  // const downloadData = (languageid: string) => {
  //   handleDownloadData(currentProject?._id, languageid);
  // };
  const downloadData = async (languageId: string) => {
    try {
      const response = await handleDownloadData(currentProject?._id, languageId);

      // Check if response contains data to download
      if (response && response.data) {
        const jsonData = response.data;

        // Convert JSON data to a Blob
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

        // Use FileSaver to trigger the file download
        FileSaver.saveAs(blob, `data_${languageId}.json`);
      } else {
        console.error('No data received for download');
      }
    } catch (error) {
      console.error('Error downloading data:', error);
    }
  };

  const headingText = 'Setting';

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <PageHeading name={headingText} />
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
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />

            <ResponsiveMasonry
              columnsCountBreakPoints={{
                100: 1,
                702: 2,
                892: 3,
                925: 4,
                1150: 4,
                1200: 5,
                1448: 6,
                1838: 7,
                1840: 8,
              }}
            >
              <Masonry>
                {projectLanguage.length > 0
                  ? projectLanguage?.map((data: NewLanguage) => (
                      <LanguageListCard
                        name={data.name}
                        code={data.code}
                        data={data}
                        handleClick={downloadData}
                      />
                    ))
                  : ''}
              </Masonry>
            </ResponsiveMasonry>
          </Box>
        </>
      )}
    </>
  );
}
