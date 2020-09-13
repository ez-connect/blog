// GitHub returns all info of a Label while GitLab does not.
// It returns the name of lables only.
// To get the detail of labels, we must use /labels endpoint
// with an authorization
export interface Label {
  name: string;
  color?: string;
  description?: string;
}
