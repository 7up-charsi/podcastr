interface PodcastDetailsPageProps {
  params: { podcastId: string };
}

const PodcastDetailsPage = (props: PodcastDetailsPageProps) => {
  const { params } = props;

  const { podcastId } = params;

  return <>PodcastDetails for {podcastId}</>;
};

export default PodcastDetailsPage;
